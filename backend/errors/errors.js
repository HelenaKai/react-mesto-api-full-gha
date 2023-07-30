const ERROR_BAD_REQUEST_CODE = 400; // некорректные данные  //
const ERROR_UNAUTHORIZED = 401; // ошибка авторизации  //
const ERROR_FORBIDDEN = 403; // ошибка доступа к объекту - удалить чужую карточку  //
const ERROR_NOT_FOUND = 404; // карточка или пользователь не найден  //
const ERROR_CONFLICT = 409; // пользователь с таким email уже зарегистрирован  //
const ERROR_DEFAULT = 500; // ошибка по-умолчанию, ошибка сервера  //

module.exports = {
  ERROR_BAD_REQUEST_CODE,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  ERROR_UNAUTHORIZED,
  ERROR_FORBIDDEN,
  ERROR_CONFLICT,
};
