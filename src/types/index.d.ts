declare module './Dither' {
  import React from 'react';
  import Dither from './Dither';
  const Dither: React.ComponentType<any>;
  export default Dither;
}

declare module '@/components/Dither' {
  import React from 'react';
  const Dither: React.ComponentType<any>;
  export default Dither;
}

declare module '*';

declare module '*.js' {
  import React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}
