import { Component, HostBinding } from '@angular/core';
import { ITopic, TopicStoreService } from '@app/common';
import appConstants from '@app/common/app-constants';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss']
})
export class NewTopicComponent {
  @HostBinding('class') classes = `newTopic ${appConstants.ui.PAGE_CONTAINER_CLASS}`;
  topic: ITopic = {
    title: '',
    description: '',
    isDefault: false
  };
  isCreating = false;
  constructor(private topicStoreService: TopicStoreService) { }

  createTopic() {
    this.topicStoreService.create(this.topic);
  }
}
