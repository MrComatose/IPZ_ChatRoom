import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVotingComponent } from './chat-voting.component';

describe('ChatVotingComponent', () => {
  let component: ChatVotingComponent;
  let fixture: ComponentFixture<ChatVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
