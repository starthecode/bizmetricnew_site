import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    parentId: { type: String, default: null },
    position: Number,
    title: String,
    url: String,
    path: String,
    description: String,
    menuAcfFields: {
      showMenuLabel: Boolean,
      showMegaMenu: Boolean,
      showServicesMegaMenu: Boolean,
      menuClasses: String,
      menuIcon: {
        mediaItemUrl: String,
      },
      menuLabel: String, // renamed from menuLabel098
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model('Menu', MenuSchema);

export default Menu;
