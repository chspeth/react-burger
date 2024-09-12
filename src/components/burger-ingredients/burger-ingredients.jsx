import { useRef, useState } from 'react';
import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsList from './ingredients-list/ingredients-list';
import CustomScrollbar from '../scrollbar/scrollbar';
import { productsCategories } from '../../utils/util';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');
  const allTabsRef = useRef();
  const scrollbarRef = useRef();
  const tabsRefs = {
    'bun': useRef(),
    'sauce': useRef(),
    'main': useRef()
  };
  
  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
    tabsRefs[tabName].current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabScroll = () => {
    const tabsTop = allTabsRef.current.getBoundingClientRect().top;
    const coordinates = {
      'bun': tabsRefs.bun.current.getBoundingClientRect().top,
      'sauce': tabsRefs.sauce.current.getBoundingClientRect().top,
      'main': tabsRefs.main.current.getBoundingClientRect().top,
    };

    const closestTab = Object.keys(coordinates).reduce((prev, curr) =>
      Math.abs(coordinates[curr] - tabsTop) < Math.abs(coordinates[prev] - tabsTop) ? curr : prev
    );

    if (currentTab !== closestTab) {
      setCurrentTab(closestTab);
    }
  }

  return (
    <section className={ styles['ingredients-section'] }>
      <h2 className={'text text_type_main-large mb-5'}>Соберите бургер</h2>
      <IngredientsTabs 
        ref={allTabsRef}
        currentTab={currentTab} 
        onTabClick={handleTabClick} />
      <CustomScrollbar 
        customStyles={{ 
          wrapperHeight: '756px', 
          thumbHeight: '76%', 
          top: '40px', 
          bottom: '50px' 
        }}
        ref={scrollbarRef} 
        onScrollFrame={handleTabScroll} >
        <div className={ styles['ingredients-lists'] }>
          {productsCategories.map(category => (
            <div 
              className={ styles['group'] } 
              key={category.type}
              ref={tabsRefs[category.type]}>
              <h3 className={`text text_type_main-medium ${ styles['group-header'] }`}> {category.title} </h3>
              <IngredientsList categoryType={category.type}/>
            </div>
          ))}
        </div>
      </CustomScrollbar>
    </section>
  )
}

export default BurgerIngredients;