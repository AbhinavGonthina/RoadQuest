const QuestComponent = ({ title, description, reward, landmark }) => {
  return (
    <div className="bg-[#002d04] p-6 rounded-2xl w-full h-[30vh] mt-4 flex flex-col">
      <div className="bg-green-400 py-3 px-4 rounded-md flex flex-col gap-2">
        <p className="font-['Bebas_Neue'] text-black text-2xl font-bold">{title}</p>
        
        <p className="font-['Bebas_Neue'] text-black text-lg font-semibold">{reward}</p>
        <p className="font-['Bebas_Neue'] text-black text-lg">{landmark}</p>
      </div>

      <div className="bg-black flex-1 w-full rounded-md mt-4">
          <p className="font-['Bebas_Neue'] text-white text-lg">{description}</p>
      </div>
    </div>
  );
};

export default QuestComponent;
