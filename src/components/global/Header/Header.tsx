const Header = () => {
  return (
    <header className='border-b-[1px] border-solid border-b-gray-700 border-l-0 border-t-0 border-r-0 p-10 flex items-center'>
      <div className='font-light text-2xl text-center self-center m-auto'>
        Welcome back, <span className='font-medium text-4xl'>Admin</span>
      </div>
      <div className='flex gap-4 items-center'>
        <div className='w-[55px] h-[55px] rounded-full cursor-pointer'>
          <img
            src='https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Admin'
            className='w-full h-full object-cover rounded-full'
          />
        </div>
        <div className='flex flex-col'>
          <div className='font-semibold text-xl'>Sterling</div>
          <div className='font-normal text-gray-400'>Super admin</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
