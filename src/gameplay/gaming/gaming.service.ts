import { Injectable } from '@nestjs/common';
import { Match } from '../match/match.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GamingService {
  private _matchMaking = [];
  private _gamePlay = [] as Match[];
  public get gamePlay() {
    return this._gamePlay;
  }
  public set gamePlay(value) {
    this._gamePlay = value;
  }
  private _matchmakingInterval;
  public get matchMaking() {
    return this._matchMaking;
  }
  public set matchMaking(value) {
    this._matchMaking = value;
  }

  public clearMatchmakingStack() {
    this.matchMaking = [];
  }

  public join(connectionUser: string) {
    const exist = this.gamePlay.some((item) => {
      return item.gameStarted == false && item.player1 != connectionUser;
    });
    if (exist) {
      return { added: false, errorMessage: 'User Already in group' };
    }
    this.matchMaking.push(connectionUser);
    const matchSearch = this.checkAssignMatch(connectionUser);
    if (matchSearch == null) {
      const matchCreated = this.createNewMatch(connectionUser);
      return { match: matchCreated };
    } else {
      return { match: matchSearch };
    }
  }
  checkAssignMatch(connectionUser: string) {
    const openMatch = this._gamePlay.find((match: Match) => {
      return !match.gameStarted;
    });
    return openMatch;
  }

  createNewMatch(connectionUser: string) {
    const matchUUID = uuidv4();
    const newMatch = {} as Match;
    newMatch.gameStarted = false;
    newMatch.gameId = matchUUID;
    newMatch.player1 = connectionUser;
    return newMatch;
  }
  public leave(connectionUser: string) {
    const cnIndex = this.matchMaking.indexOf(connectionUser);
    if (cnIndex != -1) {
      this.matchMaking.splice(cnIndex, 1);
    }
    return { added: true, errorMessage: '' };
  }
}
