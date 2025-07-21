import React from 'react';
import Header from './Header';

export default function HeaderServer() {
  const [menuData, setmenuData] = React.useState();

  const fetchMenu = async () => {
    const res = await fetch('/api/menu');
    const data = await res.json();
    setmenuData(data.data.menuItems.nodes);
  };

  React.useEffect(() => {
    fetchMenu();
  }, []);
  return <Header menus={menuData} />;
}
