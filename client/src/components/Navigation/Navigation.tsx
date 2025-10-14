import { SegmentGroup } from "@chakra-ui/react";
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navigation = () => {
  const location = useLocation();
  const [value, setValue] = useState('/');
  
  const navigationMenu = [
    { name: 'Home', path: '/' },
    { name: 'Budget Dashboard', path: '/budget' },
  ];

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleValueChange = (newValue: string | null) => {
    if (newValue) {
      setValue(newValue);
    } else {
      setValue('/');
    }
  }

  return (
    <nav>
      <SegmentGroup.Root value={value} onValueChange={(e) => handleValueChange(e.value)}>
        <SegmentGroup.Indicator />
        {navigationMenu.map((item) => (
          <SegmentGroup.Item key={item.path} asChild value={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </SegmentGroup.Item>
        ))}
      </SegmentGroup.Root>
    </nav>
  );
}