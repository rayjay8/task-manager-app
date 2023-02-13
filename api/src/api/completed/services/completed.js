'use strict';

/**
 * completed service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::completed.completed');
