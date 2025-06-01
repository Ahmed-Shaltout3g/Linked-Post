import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPostsComponent } from './loading-posts.component';

describe('LoadingPostsComponent', () => {
  let component: LoadingPostsComponent;
  let fixture: ComponentFixture<LoadingPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
