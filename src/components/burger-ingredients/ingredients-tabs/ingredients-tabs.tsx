import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import './ingredients-tabs.module.css';

const IngredientsTabs = () => {
  const [current, setCurrent] = React.useState('buns');
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauses" active={current === 'sauses'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

export default IngredientsTabs;