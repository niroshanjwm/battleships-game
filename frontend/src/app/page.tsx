"use client";
import PlayerRegisterForm from "@/components/forms/playerRegisterForm";
import FinalStats from "@/components/game/finalStats";
import ShipSetup from "@/components/game/shipSetup";
import {
  setPlayerAUsername,
  setPlayerBUsername,
} from "@/redux/slices/game/gameSlice";
import { fetchShips, createGame } from "@/redux/slices/game/gameThunk";
import { RootState, useAppDispatch } from "@/redux/store";
import { GameStep } from "@/types/game";
import { useSelector } from "react-redux";

const InitialPage = () => {
  const dispatch = useAppDispatch();

  const { currentStep, playerAUsername } = useSelector(
    (state: RootState) => state.game
  );

  const playerARegisterHandler = (username: string) => {
    dispatch(setPlayerAUsername(username));
  };

  const playerBRegisterHandler = (username: string) => {
    dispatch(setPlayerBUsername(username));
    dispatch(createGame({ playerA: playerAUsername, playerB: username }));
    dispatch(fetchShips());
  };

  const renderCurrentGameStep = (currentStep: GameStep) => {
    switch (currentStep) {
      case GameStep.PlayerARegister:
        return (
          <PlayerRegisterForm
            key={currentStep}
            title="Player A"
            onPlayerRegister={playerARegisterHandler}
          />
        );

      case GameStep.PlayerBRegister:
        return (
          <PlayerRegisterForm
            key={currentStep}
            title="Player B"
            onPlayerRegister={playerBRegisterHandler}
          />
        );

      case GameStep.PlayerAShipSetup:
        return <ShipSetup key={currentStep} />;

      case GameStep.PlayerBShipSetup:
        return <ShipSetup key={currentStep} />;

      default:
        return <FinalStats key={currentStep} />;
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        {renderCurrentGameStep(currentStep)}
      </div>
    </div>
  );
};

export default InitialPage;
