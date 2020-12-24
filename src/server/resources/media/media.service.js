import Joi from '@hapi/joi';
import uuid from 'uuid';
import path from 'path';
import readFilePromise from 'fs-readfile-promise';
import shortid from 'shortid';
import { aws, photo, config } from '@slashtoolkit/root.extended.js';

config.extend({
  aws: {
    profileName: process.env.AWS_PROFILE_NAME,
    apiKey: process.env.AWS_ACCESS_KEY_ID,
    security: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read', // none
  },
  // Photo processing configuration
  photo: {
    // Storing to cloud to Amazon S3
    gcloudConfig: {
      storage: {
        'bucket-name': process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read', // none
      },
      cloudType: 'aws',
    },
    // Path util function
    path: {
      public: v => path.join(__dirname, `../../storages/${v}`),
      storage: v => path.join(__dirname, `../../storages/${v}`),
    },
    // Image path structure and size configuration
    imageConfig: {
      writings: {
        photo: {
          original: {
            width: 'auto',
            height: 'auto',
          },
          zoom: {
            width: '1200',
            height: 'auto',
          },
          preview: {
            width: '800',
            height: 'auto',
          },
          thumbnail: {
            width: '420',
            height: 'auto',
          },
          small: {
            width: '128',
            height: 'auto',
          },
          directory: 'resources/hand-writings/%s/photo/%s/',
        },
      },
    },
  },
});

photo.init();

const MEDIA = {
  PHOTO: 'photo',
  GALLERY: 'gallery',
  PROFILE: 'profile',
};

const SIZE = {
  SMALL: 'small',
  THUMBNAIL: 'thumbnail',
  PREVIEW: 'preview',
  ORIGINAL: 'original',
};

export default {
  validate(body) {
    const schema = Joi.object().keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      mobile: Joi.string().required(),
      dob: Joi.date(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string().required(),
    });

    const { value, error } = Joi.validate(body, schema);
    value.password = this.encryptPassword(value.password);
    if (error) {
      return { error };
    }
    return { value };
  },
  async upload(req, mediaType) {
    try {
      const shortId = shortid.generate();
      const file = req.files[0];
      const { mimetype } = file;
      const fileKey = `${uuid.v4()}.${mimetype.split('/')[1]}`;
      const directories = photo.getDirectory(req.body.referenceType, mediaType, [SIZE.PREVIEW, SIZE.ORIGINAL], fileKey, shortId);
      const buffer = await readFilePromise(file.path);
      await photo.resize(file.path, {
        width: 800,
        output: directories.fullFilePath.preview,
        outputDir: directories.fullDirPath.preview,
        linkPath: directories.linkPath.preview,
      });
      await aws.upload(directories.linkPath.original, buffer, mimetype);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
  async uploadPhoto(req) {
    try {
      return await this.upload(req, MEDIA.PHOTO);
    } catch (error) {
      throw error;
    }
  },
};
