import MainScene from './scenes/MainScene';
import WelcomePortal from './components/ui/WelcomePortal';
import HUD from './components/ui/HUD';
import ProductModal from './components/ui/ProductModal';
import ShoppingCart from './components/ui/ShoppingCart';
import CheckoutModal from './components/ui/CheckoutModal';
import CustomLabModal from './components/ui/CustomLabModal';

function App() {
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* 3D Scene */}
      <MainScene />
      
      {/* UI Overlays */}
      <WelcomePortal />
      <HUD />
      <ProductModal />
      <ShoppingCart />
      <CheckoutModal />
      <CustomLabModal />
    </div>
  );
}

export default App;
