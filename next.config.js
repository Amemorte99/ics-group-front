const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: true,

  // ⚡️ Configuration pour rendre `next export` compatible avec <Image>
  images: {
    loader: 'akamai',  // ou 'imgix', 'cloudinary', selon ton choix
    path: '',          // nécessaire pour `next export`
  },
};
