import playStationIcon from "../icons/icons8-playstation (1).svg";
import ComputerGaming from "../icons/imac.png";
import xboxIcon from "../icons/icons8-xbox (1).svg";
import ninIcon from "../icons/icons8-nintendo-switch-logo.svg";
import plusIcon from "../icons/plus.png";
import linuxIcon from "../icons/linux-platform.png";
import macIcon from "../icons/apple-logo.png";
import androidIcon from "../icons/android-logo.png";

type iconTypes = {
  playstation: string;
  pc: string;
  nintendo: string;
  [xbox: string]: string;
  plus: string;
  linux: string;
  mac: string;
  android: string;
};

export const icons: iconTypes = {
  playstation: playStationIcon,
  pc: ComputerGaming,
  xbox: xboxIcon,
  nintendo: ninIcon,
  plus: plusIcon,
  linux: linuxIcon,
  mac: macIcon,
  android: androidIcon,
};
