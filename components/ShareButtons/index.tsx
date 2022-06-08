import { FC } from 'react';
import { BsFacebook, BsTelegram, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import { ShareBlock } from './styles';

const ShareButtons: FC = () => {
  const shareTelegram = () => {
    window.open(
      `https://telegram.me/share/url?url=${window.location.href}`,
      '_blank'
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${window.location.href}`,
      '_blank'
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      '_blank'
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/share?text=${window.location.href}`,
      '_blank'
    );
  };
  return (
    <ShareBlock>
      <BsTelegram size={28} onClick={shareTelegram} cursor="pointer" />
      <BsWhatsapp size={28} onClick={shareWhatsApp} cursor="pointer" />
      <BsFacebook size={28} onClick={shareFacebook} cursor="pointer" />
      <BsTwitter size={28} onClick={shareTwitter} cursor="pointer" />
    </ShareBlock>
  );
};

export default ShareButtons;
