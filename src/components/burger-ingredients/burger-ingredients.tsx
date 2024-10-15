import { useRef, useState, FC, RefObject } from 'react';
import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsList from './ingredients-list/ingredients-list';
import CustomScrollbar from '../scrollbar/scrollbar';
import { productsCategories } from '../../utils/util';
import { Scrollbars } from 'react-custom-scrollbars-2';
import styles from './burger-ingredients.module.css';

type TTabsRefs = {
  [name in 'bun' | 'sauce' | 'main']: RefObject<HTMLDivElement>;
};

type TCoordinates = {
  [name in 'bun' | 'sauce' | 'main']: number | undefined;
};

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<'bun' | 'sauce' | 'main'>('bun');
  const allTabsRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbars | null>(null);
  const tabsRefs: TTabsRefs = {
    'bun': useRef<HTMLDivElement>(null),
    'sauce': useRef<HTMLDivElement>(null),
    'main': useRef<HTMLDivElement>(null),
  };
  
  const handleTabClick = (tabName: 'bun' | 'sauce' | 'main') => {
    setCurrentTab(tabName);
    tabsRefs[tabName].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabScroll = () => {
    const tabsTop = allTabsRef.current?.getBoundingClientRect().top;
    const coordinates: TCoordinates = {
      'bun': tabsRefs.bun.current?.getBoundingClientRect().top,
      'sauce': tabsRefs.sauce.current?.getBoundingClientRect().top,
      'main': tabsRefs.main.current?.getBoundingClientRect().top,
    };

    const closestTab = (Object.keys(coordinates) as Array<keyof TCoordinates>).reduce((prev, curr) =>
      Math.abs((coordinates[curr] ?? 0) - (tabsTop ?? 0)) < Math.abs((coordinates[prev] ?? 0) - (tabsTop ?? 0)) ? curr : prev
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
              ref={tabsRefs[category.type as keyof TTabsRefs]}>
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