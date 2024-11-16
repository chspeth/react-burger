import { useRef, FC } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-ingredient.module.css';
import { IConstructorIngredientProps, IDragItem } from '../../../utils/types';

const ConstructorIngredient: FC<IConstructorIngredientProps> = (
  { element, index, moveIngredient, handleDeleteItem }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ handlerId }, drop] = useDrop<IDragItem, void, { handlerId: string | symbol | null }>({
    accept: 'constructorIngredient',
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item: IDragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredient',
    item: () => {
      return { id: element.id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div 
      className={styles['element-container']} 
      ref={ref} 
      data-handler-id={handlerId} 
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        isLocked={false}
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => handleDeleteItem(element.id)}
      />
    </div>
  );
};

export default ConstructorIngredient;
