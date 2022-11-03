import { router, store } from '../utils';
import { userAPI, UpdateProfile, UpdatePassword, SearchUserByLogin, UpdateAvatar } from '../api';
import { addNotice, loaderToggle } from '../utils/Helpers/viewHelpers';

class UserController {
  // Обновление данных пользователя
  updateUserProfileData(data: UpdateProfile): void {
    loaderToggle({ show: true });

    userAPI
      .changeUserProfileDataApi(data)
      .then(({ response }) => {
        store.setState({ user: { ...JSON.parse(response) } });
        addNotice('Данные профиля успешно сохранены!', 'success');
      })
      .catch(({ response }) => addNotice(JSON.parse(response).reason, 'error'))
      .finally(() => loaderToggle());
  }

  // Изменение аватара пользователя
  updateUserAvatar(data: FormData): void {
    loaderToggle({ show: true });

    const avatarData: UpdateAvatar = {
      data,
      headers: { accept: 'application/json' },
    };

    userAPI
      .changeUserAvatarApi(avatarData)
      .then(({ response }) => {
        store.setState({ user: { ...JSON.parse(response) } });
        router.refresh();
        addNotice('Аватар успешно изменен!', 'success');
      })
      .catch(({ response }) => {
        const errorText = 'Проблемы при изменении аватара. Попробуйте еще раз';
        const noticeText = response ? JSON.parse(response).reason : errorText;
        addNotice(noticeText, 'error');
      })
      .finally(() => loaderToggle());
  }

  // Обновление пароля пользователя.
  updateUserPassword(data: UpdatePassword): void {
    loaderToggle({ show: true });

    userAPI
      .changeUserPasswordApi(data)
      .then(() => addNotice('Пароль успешно изменен!', 'success'))
      .catch(({ response }) => {
        const errorText = 'Проблемы при изменении пароля. Попробуйте еще раз';
        const noticeText = response ? JSON.parse(response).reason : errorText;
        addNotice(noticeText, 'error');
      })
      .finally(() => loaderToggle());
  }

  // Получение данных пользователя по id
  getUserById(data: number): Promise<UserData> {
    return userAPI
      .getUserByIdApi(data)
      .then(({ response }) => JSON.parse(response))
      .catch(({ response }) => {
        throw new Error(response);
      });
  }

  // Получение данных пользователей по логину (отдает до 10 пользователей)
  // Учитывает регистр ('Ivan' !== 'ivan')
  getUsersByLogin(data: SearchUserByLogin): Promise<UserData[]> {
    loaderToggle({ show: true });

    return userAPI
      .searchUserByLogin(data)
      .then(({ response }): [] => JSON.parse(response))
      .catch(({ response }) => {
        addNotice('Ошибка при поиске пользователя. Попробуйте еще раз.', 'error');
        throw new Error(response);
      })
      .finally(() => loaderToggle());
  }
}

export default new UserController();
