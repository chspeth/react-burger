import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './constructor-ingredient.module.css';

const ConstructorIngredient = ({ element, index, moveIngredient, handleDeleteItem }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorIngredient',
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
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

ConstructorIngredient.propTypes = {
  element: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
};

export default ConstructorIngredient;
