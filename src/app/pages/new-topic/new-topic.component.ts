import { Component, OnInit } from '@angular/core';
import { ITopic } from '../../common/models/topic.model';
import { TopicStoreService } from '../../common/store';

@Component({
  selector: 'wakeup-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss'],
  host: { 'class': 'newTopic pageContent' }
})
export class NewTopicComponent implements OnInit {
  topic: ITopic = {
    title: '',
    description: '',
    isDefault: false
  };
  isCreating = false;
  constructor(private topicStoreService: TopicStoreService) { }

  ngOnInit() { }

  createTopic() {
    this.topicStoreService.create(this.topic);
  }
}
