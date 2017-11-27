import { Page } from "./Page";
import { $$, ElementFinder } from "protractor";

export class QuestionSetsPage extends Page {
  items = $$(".questionSetList li a");
  playButton = $$('.questionSetList li a div[role="button"]');
  constructor() {
    super("/questionSets");
  }

  startPracticeSession(questionSetNo) {
    this.playButton.get(questionSetNo).click();
  }
}
