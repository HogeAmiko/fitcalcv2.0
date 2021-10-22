import { Dispatch, SetStateAction, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { deleteFood } from '../../redux/reducers';

import style from './FoodConfirmedList.module.scss';
import DehazeIcon from '@mui/icons-material/Dehaze';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';


type themeFoodConfirmedListType = {
  theme: boolean,
  moveCard: (dragIndex: number, hoverIndex: number) => void
  item: string
  dragMode: boolean
  setDragMode: Dispatch<SetStateAction<boolean>>
  index: number
  id: number
}

interface DragItem {
  index: number
  id: string
  type: string
}

export function FoodConfirmedList({theme, moveCard, index, item, id, dragMode, setDragMode}: themeFoodConfirmedListType) {

  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null)
  const [{handlerId}, drop] = useDrop({
    accept: dragMode ? 'remove' : 'no draggable',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  console.log(handlerId);

  const [, drag] = useDrag({
    type: 'remove',
    item: () => {
      return {id, index}
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={theme ? style.title : style.titleDark} data-handler-id={handlerId}>
      <DehazeIcon className={theme ? style.dehazeIcon : style.dehazeIconDark}
                  style={dragMode ? {opacity: 0.6} : {opacity: 0.2}}
                  onClick={() => setDragMode(!dragMode)}
      />
      {item}
      {dragMode
        ? <RemoveCircleOutlineIcon className={style.removeIcon} style={{opacity: 0.6}} onClick={() => dispatch(deleteFood(id))}/>
        : null
      }
    </div>)
}