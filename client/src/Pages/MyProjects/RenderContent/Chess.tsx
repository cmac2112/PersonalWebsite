import Emphasis from "../../../Components/Emphasis/Emphasis"
import Button from '../../../Components/Button/Button'
import "../../../Components/ProgressionMeter/PogressionMeter.css"
import { DefinedRoutes } from '../../../Helpers/RouteConstants'
const Chess = () => {
   const isMobileDevice = () => {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    );
  };
  const handleWindowNavigation = (url: string) => {
    const delayTime = isMobileDevice() ? 200 : 100;
    setTimeout(() => {
      window.open(url, "_blank");
    }, delayTime);
  };
  return (
    <div>
      <h2><Emphasis>A Complete Chess Game From Scratch!</Emphasis></h2>
      <p>
      A fully functional chess game built entirely from scratch using React and TypeScript, with no 
      external chess libraries or engines. Every aspect of the game—from board rendering to complex 
      rule validation—was manually implemented. The project features complete move validation, piece 
      capture mechanics, check and checkmate detection, and smooth piece movement animations. Players 
      can compete locally against another human or challenge a custom-built AI opponent that uses a 
      basic minimax-style evaluation system. The game enforces all standard chess rules including 
      pinned piece restrictions and illegal move prevention, with castling and en passant planned for 
      future iterations.
    </p>
    <h2><Emphasis>Impact</Emphasis></h2>
    <p>
      This project provides an accessible, browser-based chess experience that runs entirely client-side 
      with no server dependency. Players can enjoy both human-vs-human and human-vs-AI matches without 
      requiring downloads or accounts. The AI opponent, while intentionally basic, offers a functional 
      training ground for beginners to practice tactics and strategy. Beyond user impact, building this 
      game from the ground up revealed the substantial complexity hidden within seemingly simple games
      every move requires validation against multiple rule systems, board states, and potential future 
      positions.
    </p>
    <h2><Emphasis>Problem-Solving Approach</Emphasis></h2>
    <p>
      The most complex challenge was implementing check and checkmate validation while preventing illegal 
      moves. This required building a lookahead system that evaluates whether a proposed move would expose 
      the player's king to danger, particularly challenging when dealing with pinned pieces that shield the 
      king from attack. The solution involved creating a move simulation layer that tests each potential 
      move against all opponent piece threats before allowing execution. The AI implementation balances 
      simplicity with functionality: it evaluates board positions using weighted square values (favoring 
      center control) and piece capture opportunities, while incorporating self-check detection to avoid 
      suicidal moves. This approach created an easily beatable but legally compliant opponent. The 2D 
      string matrix representation keeps state management straightforward while TypeScript's type system 
      ensures piece and move validation remains consistent across the codebase.
    </p>
        <div className="button-image-container">
        <div className="tile-buttons">
          <Button
            label="Play Now!"
            OnClickCallback={() =>
              handleWindowNavigation(
                `${DefinedRoutes.Chess}`,
              )
            }
            materialIcon="chess_knight"
            iconPosition="right"
          />
          <Button
            label="View The Repo"
            OnClickCallback={() =>
              handleWindowNavigation(
                "https://github.com/cmac2112/Chess-With-AI-Opponents",
              )
            }
            materialIcon="code"
            iconPosition="right"
          />
        </div>
      </div>

    </div>
  )
}

export default Chess
