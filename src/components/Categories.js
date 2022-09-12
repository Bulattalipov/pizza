import { memo } from 'react';

const Categories = memo(({ categoriesId, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onButtonItem = (index) => {
    onChangeCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((items, i) => (
          <li
            key={i}
            onClick={() => onButtonItem(i)}
            className={categoriesId === i ? 'active' : ''}>
            {items}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
