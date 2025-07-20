import 'reflect-metadata';
import { AppDataSource } from '../src/ormconfig';
import { ScanJob } from '../src/scan_job/scan-job.entity';
import { Template } from '../src/templates/template.entity';


async function clean() {
  await AppDataSource.initialize();

  const scanJobs = await ScanJob.find();
  const templates = await Template.find();
  const validTemplateIds = new Set(templates.map(t => t.id));

  for (const job of scanJobs) {
    if (!validTemplateIds.has(job.templateId)) {
      console.log(`Deleting scan job with invalid templateId: ${job.id}`);
      await job.remove();
    }
  }

  await AppDataSource.destroy();
}

clean().catch(console.error);