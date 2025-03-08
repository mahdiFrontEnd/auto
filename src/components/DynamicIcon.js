import React, { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
import * as BsIcons from 'react-icons/bs';
import * as PiIcons from 'react-icons/pi';
import * as TbIcons from 'react-icons/tb';
import * as LiaIcons from 'react-icons/lia';
import * as GrIcons from 'react-icons/gr';
import * as LuIcons from 'react-icons/lu';
import * as FaIcons from 'react-icons/fa6';
import * as IoIcons from 'react-icons/io5';
import * as ImIcons from 'react-icons/im';
import * as TfIcons from 'react-icons/tfi';


const libraryMap = {
  Md: MdIcons,
  Fa: FaIcons,
  Cg: CgIcons,
  Bs: BsIcons,
  Pi: PiIcons,
  Tb: TbIcons,
  Li: LiaIcons,
  Gr: GrIcons,
  Lu: LuIcons,
  Io: IoIcons,
  Im: ImIcons,
  Tf: TfIcons,
};

const DynamicIcon = ({ iconName, ...props }) => {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    if (iconName) {
      const libPrefix = iconName.slice(0, 2);
      const library = libraryMap[libPrefix];
      if (library && library[iconName]) {
        setIconComponent(() => library[`${iconName}`]);
      }
    }
  }, [iconName]);

  return IconComponent ? <IconComponent {...props} /> : null;
};

export default DynamicIcon;