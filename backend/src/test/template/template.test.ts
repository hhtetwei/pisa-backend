import { templatesService } from "../../templates/template.service";



describe('templatesService.detectMarkedOption', () => {
  it('should detect correct option when present in text', () => {
    const text = ' B ';
    const options = ['A', 'B', 'C'];
    const result = templatesService.detectMarkedOption(text, options);
    expect(result).toBe('B');
  });

  it('should return null if no option found', () => {
    const text = 'No valid option here';
    const options = ['A', 'B', 'C'];
    const result = templatesService.detectMarkedOption(text, options);
    expect(result).toBeNull();
  });

  it('should ignore spaces and case when matching', () => {
    const text = '  c ';
    const options = ['A', 'B', 'C'];
    const result = templatesService.detectMarkedOption(text, options);
    expect(result).toBe('C');
  });
});
