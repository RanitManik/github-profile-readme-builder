interface ActionButton {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

interface ActionButtonsProps {
    buttons: ActionButton[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons }) => {
    return (
        <div className="border-border bg-foreground flex overflow-hidden rounded-md border">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    className="text-border-200 hover:text-border-100 border-border hover:bg-background/10 cursor-pointer border-r px-3 py-1 text-xs transition last:border-transparent"
                    onClick={button.onClick}
                    {...button.props}
                >
                    {button.icon}
                </button>
            ))}
        </div>
    );
};

export default ActionButtons;
