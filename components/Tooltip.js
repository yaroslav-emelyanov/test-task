export default ({title, hiddenTooltip, isVisible}) => (
    <button type="button"
                    className="btn btn-secondary position-absolute"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Закрыть"
                    onClick={() => hiddenTooltip()}
                    style={{
                        left: '50%',
                        top: '15vh',
                        transform: 'translateX(-50%)',
                        display: isVisible ? 'block' : 'none'
                    }}
            >
                { title }
            </button>
)