"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_service_1 = require("../../templates/template.service");
describe('templatesService.detectMarkedOption', () => {
    it('should detect correct option when present in text', () => {
        const text = ' B ';
        const options = ['A', 'B', 'C'];
        const result = template_service_1.templatesService.detectMarkedOption(text, options);
        expect(result).toBe('B');
    });
    it('should return null if no option found', () => {
        const text = 'No valid option here';
        const options = ['A', 'B', 'C'];
        const result = template_service_1.templatesService.detectMarkedOption(text, options);
        expect(result).toBeNull();
    });
    it('should ignore spaces and case when matching', () => {
        const text = '  c ';
        const options = ['A', 'B', 'C'];
        const result = template_service_1.templatesService.detectMarkedOption(text, options);
        expect(result).toBe('C');
    });
});
