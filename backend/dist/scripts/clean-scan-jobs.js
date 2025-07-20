"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ormconfig_1 = require("../src/ormconfig");
const scan_job_entity_1 = require("../src/scan_job/scan-job.entity");
const template_entity_1 = require("../src/templates/template.entity");
async function clean() {
    await ormconfig_1.AppDataSource.initialize();
    const scanJobs = await scan_job_entity_1.ScanJob.find();
    const templates = await template_entity_1.Template.find();
    const validTemplateIds = new Set(templates.map(t => t.id));
    for (const job of scanJobs) {
        if (!validTemplateIds.has(job.templateId)) {
            console.log(`Deleting scan job with invalid templateId: ${job.id}`);
            await job.remove();
        }
    }
    await ormconfig_1.AppDataSource.destroy();
}
clean().catch(console.error);
