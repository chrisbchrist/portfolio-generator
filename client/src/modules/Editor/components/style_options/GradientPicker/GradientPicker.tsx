import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useRef,
  useEffect
} from "react";
import { Button, Icon, Modal, Carousel, Pagination, Tooltip, Slider } from "antd";
import gradients from "../../../gradients";
import "./GradientPicker.css";
import { GradientModalContent } from "./GradientModalContent";
import {GradientCarousel } from "./GradientPages";

export type Gradient = {
  name: string;
  colors: string[];
  opacity?: number;
  direction?: string;
};

// Transforms array of hex colors into comma-separated values to insert into CSS
const formatColors: (colors: string[]) => string = colors => {
  let output: string = "";
  for (let i = 0; i < colors.length; i++) {
    if (i === colors.length - 1) {
      output += colors[i];
    } else {
      output += `${colors[i]}, `;
    }
  }
  return output;
};

const directions: string[] = ["to top", "to right", "to bottom", "to left"];

interface GradientPickerProps {
  pageSize?: number;
  setGradient: (gradient: Gradient) => void;
}

export const GradientPicker: FunctionComponent<GradientPickerProps> = ({
  pageSize = 12,
    setGradient
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedGradient, setSelectedGradient] = useState<Gradient>(null);
  const [formattedGradient, setFormattedGradient] = useState<string>(null);
  const [opacity, setOpacity] = useState<number>(1);
  const [direction, setDirection] = useState<string>("to top");

  // Create ref for carousel to utilize navigation methods
  const carousel = useRef<Carousel>();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const rotateGradient = () => {
    const currentIndex = directions.indexOf(direction);
    const newIndex = currentIndex + 1 === 4 ? 0 : currentIndex + 1;
    setDirection(directions[newIndex]);
  };

  const handleSliderChange = (value: number) => {
    setOpacity(value * 0.01);
  };

  const confirm = () => {
    const gradient = {
        ...selectedGradient,
        direction,
        opacity
    };
    console.log(gradient);
    setGradient(gradient);
  }

  // Generate page-sized divs for use with AntD carousel containing gradient options
  const generatePages: (
    gradients: Gradient[],
    pageSize: number
  ) => ReactElement[] = (gradients, pageSize) => {
    let pages: ReactElement[] = [];
    for (let i = 0; i < Math.ceil(gradients.length / pageSize); i++) {
      const min: number = i * pageSize;
      const max: number = (i + 1) * pageSize;
      pages.push(
        <div className="gradients__options" key={"page" + i}>
          {gradients
            .slice(min, max)
            .map((gradient: Gradient, index: number) => {
              const trueIndex = min + index;
              return (
                <div
                    key={gradient.name}
                  className="gradient__option"
                  style={{
                    background: `linear-gradient(to top, ${formatColors(
                      gradient.colors
                    )})`
                  }}
                  onClick={() => setSelectedGradient(gradients[trueIndex])}
                >
                  <span className="gradient__option-name">{gradient.name}</span>
                </div>
              );
            })}
        </div>
      );
    }

    return pages;
  };

  const onChangePage = (page: number, pageSize: number) => {
    carousel.current.goTo(page - 1);
  };

  return (
    <div>
      <Button onClick={toggleModal}>Gradient</Button>
      <Modal
        className="gradients__modal"
        visible={showModal}
        width={800}
        onCancel={toggleModal}
        title={
          <h4 className="photo-picker__title">
            <Icon
              type="bg-colors"
              style={{ color: "#fff", opacity: 0.7, fontSize: 24 }}
            />{" "}
            Select a Gradient
          </h4>
        }
        footer={
          <div className="pexels__wrapper">
            Gradients from{" "}
            <a
              className="pexels__link"
              target="_blank"
              href="https://www.uigradients.com"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="113"
                height="18"
                viewBox="0 0 113 18"
                className="uigradients__logo"
              >
                <path
                  fillRule="evenodd"
                  d="M104.573 7.877c-1.65 1.446-6.2 5.171-6.761 5.643-.445.376-.855.752-.992.598-.137-.136.325-1.077.582-1.539.29-.547 1.316-2.462 2.445-4.582h2.035l.461-.873-2.034.018c1.573-2.976 2.223-4.087 2.223-4.087h-2.72s-.53.923-2.222 4.087h-1.967s-.17.307-.462.855h1.984l-.585 1.088c-1.777 1.703-4.283 4.066-4.733 4.435-.428.376-.838.752-.975.598-.137-.136.325-1.077.565-1.539a104.506 104.506 0 0 0 1.436-2.701c1.3-2.48.256-3.232-1.077-3.232-.804 0-3.284.735-6.72 5.215l2.787-5.198H85.14l-3.023 5.629c-2.082 2.195-4.146 3.673-5.938 3.673-1.47 0-2.069-.872-1.778-2.24.24.222.53.41.906.513 1.488.462 3.181-.342 4.652-2.172 2.445-3.06.906-5.42-1.574-5.42-1.43 0-3.62 1.206-5.479 3.943-1.422 1.35-2.821 2.663-3.139 2.93-.445.377-.855.753-.992.6-.137-.137.325-1.078.582-1.54.735-1.385 3.18-5.933 3.18-5.933l-2.719.017s-.547 1.025-1.273 2.38c-1.773 1.705-4.31 4.104-4.763 4.477-.445.376-.838.752-.992.598-.137-.136.325-1.077.582-1.539.735-1.385 6.104-11.44 6.104-11.44h-2.702s-2 3.745-3.95 7.405c-.205-1.01-.923-1.898-1.898-1.898-1.418 0-3.443 1.093-5.703 4.309-1.28 1.214-2.465 2.322-2.761 2.565-.445.376-.838.752-.992.598-.137-.136.325-1.077.581-1.539.736-1.385 3.181-5.933 3.181-5.933l-2.719.017s-.41.786-1.009 1.898c-.205-1.01-.923-1.915-1.898-1.915-1.418 0-3.443 1.093-5.703 4.309-1.28 1.214-2.465 2.322-2.761 2.565-.428.376-.838.752-.975.598-.137-.136.308-1.077.564-1.539.735-1.385.855-1.47 1.283-2.291 1.145-2.189-.548-1.317-1.864-2.07a1.338 1.338 0 0 1-.332-.257 2.952 2.952 0 0 0-.005-.093c1.008-1.098 1.796-2.222.901-2.796-.838-.547-2.326-.786-3.317.445-1.09 1.373-.213 2.693.642 3.326-1.782 1.711-4.514 4.29-4.986 4.677-.427.376-.838.752-.974.598-.137-.136.324-1.077.564-1.539a438.001 438.001 0 0 0 1.624-3.026l-1.333.017H29.24c-.257 0-.496.12-.616.342l-.65 1.077a.403.403 0 0 0 0 .393c.069.12.189.206.325.206h2.087c-1.403 1.727-3.42 3.676-5.831 3.676-2.89 0-2.839-3.146-.48-6.977 2.36-3.83 5.456-5.626 6.79-5.626 1.71 0 1.35 2.446-1.232 4.43 0 0 1.129 1.128 1.95.58 2.821-1.88 3.078-6.532-.753-6.532-1.95 0-6.122 1.266-9.627 6.19-.96 1.349-1.59 2.601-1.949 3.74-1.235 1.168-2.354 2.215-2.634 2.45-.444.377-.855.753-.992.6-.136-.137.325-1.078.582-1.54.735-1.385 3.18-5.933 3.18-5.933l-2.718.017-1.288 2.407c-1.776 1.703-4.292 4.08-4.732 4.45-.444.376-.855.752-.992.598-.136-.136.325-1.077.582-1.539.735-1.385 3.18-5.933 3.18-5.933l-2.718.017s-.616 1.145-1.403 2.633c-1.026 1.779-3.915 4.822-4.873 4.822-.992 0-.479-1.077-.222-1.539.735-1.385 3.18-5.933 3.18-5.933l-2.719.017S1.231 13.093.53 14.375C-.445 16.17-.085 18 1.625 18c1.111 0 3.231-1.813 5.061-3.83-.308.564-.547.991-.667 1.23-.975 1.78-.461 2.6.667 2.6.718 0 1.642-.41 3.13-1.813.636-.605 2.2-2.159 3.738-3.697a608.615 608.615 0 0 1-1.567 2.91c-.975 1.78-.462 2.6.667 2.6.718 0 1.642-.41 3.13-1.813.548-.52 1.783-1.745 3.097-3.056C18.773 16.18 20.9 18 23.46 18c1.676 0 3.232-.718 4.6-1.761-.41 1.197.103 1.761 1.043 1.761.718 0 1.642-.41 3.13-1.813 1.133-1.076 5.188-5.157 6.819-6.808.297.22.45.614-.065 1.473-.838 1.402-1.778 3.266-2.48 4.549-.957 1.778-.461 2.599.667 2.599.701 0 1.66-.41 3.13-1.813.372-.349 1.05-1.014 1.852-1.81C41.569 16.569 42.4 18 44.084 18c1.18 0 2.394-.838 3.403-1.847-.462 1.266.051 1.847 1.009 1.847.718 0 1.658-.41 3.129-1.813.369-.35 1.049-1.02 1.855-1.82-.593 2.197.24 3.633 1.924 3.633 1.18 0 2.394-.838 3.403-1.847-.462 1.266.051 1.847 1.009 1.847.718 0 1.658-.41 3.13-1.813.641-.61 2.225-2.184 3.775-3.734a617.245 617.245 0 0 1-1.587 2.948C64.159 17.179 64.672 18 65.8 18c.718 0 1.641-.41 3.13-1.813.469-.446 1.443-1.409 2.539-2.5-.555 2.492.71 4.313 3.855 4.313 1.614 0 3.24-.769 4.773-1.946L79.053 18h2.702l.034-.051-.034.051c2.223-4.104 6.789-8.379 7.78-8.379.582 0 .36.752-.341 2.07-.787 1.436-1.283 2.427-1.984 3.71-.975 1.778-.462 2.599.667 2.599.701 0 1.641-.41 3.13-1.813.636-.604 2.194-2.156 3.726-3.693-.783 1.463-1.375 2.574-1.555 2.907-.975 1.778-.462 2.599.667 2.599.718 0 1.641-.41 3.13-1.813 1.026-.975 4.933-4.417 7.02-6.283-.139.726-.243 1.475-.369 2.18-.154.803-.29 1.419-.462 1.932-2.189.581-4.206.974-4.412 2.154-.273 1.488 1.232 1.83 2.292 1.83 1.744 0 3.488-.564 4.651-3.557 2.223-1.077 5.592-3.59 7.13-5.9.138-.222.257-1.504-.153-1.162-2.497 3.249-4.72 4.788-6.515 5.592.102-.377.205-.787.273-1.214l.684-3.42s3.147-2.685.154-2.48c-1.426.098-2.212.907-2.695 2.018zm-85.61-3.42c-1.042 0-1.521-.838-1.06-1.881.48-1.043 1.694-1.898 2.737-1.898 1.06 0 1.522.855 1.06 1.898-.462 1.043-1.693 1.88-2.736 1.88zm27.019 10.841c.89 0 2.496-1.505 3.59-3.351 1.112-1.847 1.283-3.352.411-3.352-.889 0-2.496 1.505-3.608 3.352-1.094 1.846-1.265 3.351-.393 3.351zm11.32 0c.89 0 2.497-1.505 3.591-3.351 1.112-1.847 1.283-3.352.41-3.352-.889 0-2.496 1.505-3.608 3.352-1.094 1.846-1.265 3.351-.393 3.351zM72.111 4.457c1.043 0 2.274-.838 2.736-1.881.461-1.043 0-1.898-1.06-1.898-1.044 0-2.258.855-2.737 1.898-.461 1.043.018 1.88 1.06 1.88zm6.652 4.138c-.89 0-2.497 1.488-3.609 3.352-.034.085-.085.154-.136.239.838.65 1.795 0 2.599-.667 1.094-.923 2.018-2.924 1.146-2.924zm21.888 7.934c-.12.633.735.496 1.162-.085.206-.274.428-.513.65-.855-.992.308-1.744.581-1.812.94z"
                />
              </svg>
            </a>
          </div>
        }
      >
        {selectedGradient && (
          <div className="gradient__preview-wrapper">
            <div className="gradient__rotate-wrapper">
              <div className="gradient__rotate" onClick={rotateGradient}>
                <Tooltip title="Rotate">
                  <Icon className="gradient__icon" type="redo"/>
                </Tooltip>
              </div>
            </div>
            <div className="gradient__alpha-wrapper">
              <span className="gradient__alpha-label">Opacity</span>
              <Slider defaultValue={100} max={100} min={1} onChange={handleSliderChange}/>
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
            <div
              className="gradients__preview"
              style={{
                background: `linear-gradient(${direction}, ${formatColors(
                  selectedGradient.colors
                )})`,
                opacity
              }}
            >
              <h4 className="gradients__preview-name">
                {selectedGradient.name}
              </h4>
            </div>
              <div className="gradients__preview-bg"/>
            </div>
          </div>
        )}

        <div className="gradients__carousel-wrapper">
          <GradientCarousel ref={carousel} gradients={gradients} pageSize={pageSize} setSelectedGradient={setSelectedGradient}/>
          <div className="gradients__pagination-wrapper">
            <Pagination
              size="small"
              pageSize={pageSize}
              total={gradients.length}
              onChange={onChangePage}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
