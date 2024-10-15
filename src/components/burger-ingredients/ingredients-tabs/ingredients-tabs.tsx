import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients-tabs.module.css';
import { IIngredientsTabsProps } from '../../../utils/types';

const IngredientsTabs = React.forwardRef<HTMLDivElement, IIngredientsTabsProps>(
  ({ currentTab, onTabClick }, ref) => {
  return (
    <div className={ styles['tabs'] } ref={ref}>
      <Tab 
        value='bun' 
        active={currentTab === 'bun'} 
        onClick={() => onTabClick('bun')}>
        Булки
      </Tab>
      <Tab 
        value='sauce' 
        active={currentTab === 'sauce'} 
        onClick={() => onTabClick('sauce')}>
        Соусы
      </Tab>
      <Tab 
        value='main' 
        active={currentTab === 'main'} 
        onClick={() => onTabClick('main')}>
        Начинки
      </Tab>
    </div>
  )
})

export default IngredientsTabs;