
import { Template } from './template.entity';
import { TemplateRegion } from '../template_regions/template-regions.entity';

export const templatesService = {
    createTemplate: async (data: Partial<Template>) => {
      const { name, description, createdBy, regions } = data;
  
      const template = Template.create({ name, description, createdBy });
      await template.save();
  
      if (regions && regions.length > 0) {
        const regionEntities = regions.map(region => {
          return TemplateRegion.create({
            ...region,
            template,
          });
        });
  
        await TemplateRegion.save(regionEntities);
      }
  
      return await Template.findOne({
        where: { id: template.id },
        relations: ['regions'],
      });
    },
  
    getTemplateById: async (id: number) => {
      return await Template.findOne({ where: { id }, relations: ['regions'] });
    },
  
    listTemplates: async () => {
      return await Template.find({ relations: ['regions'] });
    },

    getQRRegion(template: any) {
        return template.regions.find((r: any) => r.type === 'qr_code');
      },
    
      getQuestionRegions(template: any) {
        return template.regions.filter((r: any) => r.type !== 'qr_code');
    },
      
    detectMarkedOption(text: string, options: string[]): string | null {
      const normalizedText = text.trim().toUpperCase();
      for (const option of options) {
        if (normalizedText === option.toUpperCase()) {
          return option;
        }
      }
      return null;
    }
  };
  