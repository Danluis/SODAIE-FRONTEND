



const Timeline = ({paso1,paso2,paso3,paso4}) => {
  
    const steps = [
        { id: 1, name: 'Paso 1', status: `${paso1}` },
        { id: 2, name: 'Paso 2', status: `${paso2}` },
        { id: 3, name: 'Paso 3', status: `${paso3}` },
        { id: 4, name: 'Paso 4', status: `${paso4}` }
      ];

  
    return (
    <div className="flex items-center justify-center mt-10">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.status === 'completed' ? 'bg-orange-500' : 'bg-gray-400'
              }`}
            >
              <span className="text-white">{step.id}</span>
            </div>
            <span
              className={`mt-2 ${
                step.status === 'completed' ? 'text-orange-500' : 'text-gray-700'
              }`}
            >
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex items-center">
              <hr className="border-t-2 border-gray-400 w-16 mx-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
