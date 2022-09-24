/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const props = {
  name: 'Abby',
  chat: 'the last of us. Part II',
  getChat() {
    this._privateMethod();
  },
  _privateMethod() {
    console.log(this._privateProp);
  },
  __privateMethodToo() {},
  _privateProp: 'Нельзя получить просто так',
};

const proxyProps = new Proxy(props, {
  get(props, prop) {
    if (prop.startsWith('_')) {
      throw new Error('Error: Нет прав');
    } else {
      return (typeof props[prop] === 'function') ? props[prop].bind(props) : props[prop];
    }
  },
  set(props, prop, value) {
    if (prop.startsWith('_')) {
      throw new Error('Error: Нет прав');
    } else {
      // eslint-disable-next-line no-param-reassign
      props[prop] = value;
      return true;
    }
  },
  deleteProperty(props, prop) {
    if (prop.startsWith('_')) {
      throw new Error('Error: Нет прав');
    } else {
      // eslint-disable-next-line no-param-reassign
      delete props[prop];
      return true;
    }
  },
});

proxyProps.getChat();
delete proxyProps.chat;

proxyProps.newProp = 2;
console.log(proxyProps.newProp);

try {
  proxyProps._newPrivateProp = 'Super game';
} catch (error) {
  console.log(error);
}

try {
  delete proxyProps._privateProp;
} catch (error) {
  console.log(error); // Error: Нет прав
}

/*
Вывод в консоль следующий:
Нельзя получить просто так
2
Error: Нет прав
Error: Нет прав
*/
