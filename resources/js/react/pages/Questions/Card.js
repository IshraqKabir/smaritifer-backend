import React from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "../../ItemTypes";

const style = {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move"
};
export const Card = ({ id, text, moveCard, findCard }) => {
    const originalIndex = findCard(id).index;
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.QUIZ, id, originalIndex },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        end: (dropResult, monitor) => {
            const { id: droppedId, originalIndex } = monitor.getItem();
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveCard(droppedId, originalIndex);
            }
        }
    });
    const [, drop] = useDrop({
        accept: ItemTypes.QUIZ,
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findCard(id);
                moveCard(draggedId, overIndex);
            }
        }
    });
    const opacity = isDragging ? 0 : 1;
    return (
        <tr ref={node => drag(drop(node))} style={{ ...style, opacity }}>
            <td>{text}</td>
        </tr>
    );
};
