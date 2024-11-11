import { useState, useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/types';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/user';
import styles from './profile.module.css';

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [originalData, setOriginalData] = useState({ name: '', email: '' });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setOriginalData({ name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (name !== originalData.name || email !== originalData.email || password !== '') {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    }
  }, [name, email, password, originalData, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      name,
      email,
      password: password || '',
    };
    dispatch(updateUser(updatedData));
  };

  const handleCancel = () => {
    setName(originalData.name);
    setEmail(originalData.email);
    setPassword('');
    setIsModified(false);
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Input
        type='text'
        placeholder='Имя'
        icon='EditIcon'
        value={name}
        name='name'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      />
      <EmailInput
        placeholder='Логин'
        extraClass='mt-6'
        isIcon={true}
        value={email}
        name='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        placeholder='Пароль'
        extraClass='mt-6'
        icon='EditIcon'
        value={password}
        name='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      {isModified && (
        <div className={styles['button-group']}>
          <Button
            type='secondary'
            size='medium'
            onClick={handleCancel}
            extraClass='mr-4' 
            htmlType='button' 
          >
            Отмена
          </Button>
          <Button
            type='primary'
            size='medium'
            htmlType={'submit'}
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
