import css from './contactList.module.css';

const ContactList = ({ onDeleteContact, contactlist }) => {
  const getId = e => {
    const id = e.target.dataset.id;
    onDeleteContact(id);
  };

  const elements = contactlist.map(contact => (
    <li key={contact.id} className={css.list_item}>
      <span className={css.list_title}>
        {contact.name}: {contact.number}
      </span>
      <button
        data-id={contact.id}
        type="button"
        className={`btn btn-primary btn-sm ${css.button}`}
        onClick={getId}
      >
        Delete
      </button>
    </li>
  ));
  return <ul className="list-group">{elements}</ul>;
};

export default ContactList;
