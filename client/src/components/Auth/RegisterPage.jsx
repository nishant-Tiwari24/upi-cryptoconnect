
import Navbar from "../Navbar";
import Footer from "../Footer";
import { bill } from "../../assets";
import styles from "../../style";
import { layout } from "../../style";
import Register from "./Register";

const RegisterPage = () => (
  <div className="bg-black w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        {/* <Navbar /> */}
    </div>
    <section>
    <div className="flex justify-around gap-8">
    <div className={layout.sectionImgReverse}>
      <img src={bill} alt="billing" className="w-[100%] h-[100%] pl-[60px] relative z-[5] object-contain" />

      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
    </div>

    <div className={layout.sectionInfo}>
      <Register/>
    </div>
    </div>
  </section>
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>
  </div>
);

export default RegisterPage;
