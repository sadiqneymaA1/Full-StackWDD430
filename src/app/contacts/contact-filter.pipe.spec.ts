import { ContactsFilterPipe } from './contacts-filter.pipe';
import { Contact } from './contact.model';

describe('ContactsFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ContactsFilterPipe();
    expect(pipe).toBeTruthy();
  });
});