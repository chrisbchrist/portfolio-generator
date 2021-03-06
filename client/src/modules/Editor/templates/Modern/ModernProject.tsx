import React, { FunctionComponent, useState } from "react";
import { Project } from "../../../../types";
import { Icon, Button } from "antd";

interface ProjectProps {
    project: Project;
    even: boolean;
    customColor: string;
}

export const ModernProject: FunctionComponent<ProjectProps> = ({
                                                                  project,
                                                                  even,
                                                                  customColor
                                                              }) => {
    const [error, setError] = useState<boolean>(false);

    const srcLink =
        project.srcUrl === "Private" ? (
            <Button icon="eye-invisible" disabled={true}>
                Source Private
            </Button>
        ) : (
            <a href={project.srcUrl}>
                <Button icon="code">Source</Button>
            </a>
        );

    const errorFallback = (
        <div className="basic__img-fallback">
            <Icon
                type="close-circle"
                theme="twoTone"
                twoToneColor="#f74856"
                className="img-fallback__icon"
            />
            <p className="img-fallback__text">Invalid image URL!</p>
        </div>
    );

    return (
        <div
            className={
                even
                    ? "basic__project basic__project--even"
                    : "basic__project basic__project--odd"
            }
        >
            <div className="basic__project-wrapper">
                <h3 className="basic__project-title">{project.title}</h3>
                <div className="basic__project-img-wrapper">
                    {!error ? (
                        <img
                            alt={project.title}
                            onError={() => setError(true)}
                            className="basic__project-img"
                            src={project.imgUrl}
                        />
                    ) : (
                        errorFallback
                    )}
                </div>
                <div className="basic__project-info">
                    <p className="basic__project-desc">{project.desc}</p>
                    {/*{ project.tags.length > 0 && <h4 className="basic__tags-label">Technologies</h4>}*/}

                    {(project.srcUrl || project.demoUrl) && (
                        <div className="basic__project-links">
                            {project.demoUrl && (
                                <a href={project.demoUrl}>
                                    <Button
                                        type="primary"
                                        style={{
                                            background: customColor || "#1890ff",
                                            borderColor: customColor || "#1890ff",
                                            marginRight: 15
                                        }}
                                        icon="github"
                                        className="basic__button"
                                    >
                                        Demo
                                    </Button>
                                </a>
                            )}
                            {project.srcUrl && srcLink}
                        </div>
                    )}
                    <div className="basic__project-tags">
                        {project.tags.length > 0 &&
                        project.tags.map((tag: string, index: number) => (
                            <div key={tag + index} className="basic__tag">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
