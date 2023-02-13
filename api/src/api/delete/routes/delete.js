'use strict';

/**
 * delete router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::delete.delete');
