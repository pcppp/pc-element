export default function () {
  if (PROD) {
    const logo = `
________________________________________________________________

 ____    __    ___  _        ___  ___ ___    ___  ____   ______ 
|    \  /  ]  /  _]| |      /  _]|   |   |  /  _]|    \ |      |
|  o  )/  /  /  [_ | |     /  [_ | _   _ | /  [_ |  _  ||      |
|   _//  /  |    _]| |___ |    _]|  \_/  ||    _]|  |  ||_|  |_|
|  | /   \_ |   [_ |     ||   [_ |   |   ||   [_ |  |  |  |  |  
|  | \     ||     ||     ||     ||   |   ||     ||  |  |  |  |  
|__|  \____||_____||_____||_____||___|___||_____||__|__|  |__|  
                                                                
________________________________________________________________
              author:Pc
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log('[EricUI]:dev mode...');
  }
}
