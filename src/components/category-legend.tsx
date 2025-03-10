interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

const CategoryLegend = ({ categories }: { categories: Category[] }) => {
  return (
    <div className='flex flex-wrap gap-3 mb-6'>
      {categories.map((category) => (
        <div
          key={category.id}
          className='flex items-center'
        >
          <div
            className='w-5 h-5 rounded-md mr-2 flex items-center justify-center text-white text-xs'
            style={{ backgroundColor: category.color }}
          >
            {category.icon}
          </div>
          <span className='text-sm'>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryLegend;
