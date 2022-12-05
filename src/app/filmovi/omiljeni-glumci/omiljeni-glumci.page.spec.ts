import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OmiljeniGlumciPage } from './omiljeni-glumci.page';

describe('OmiljeniGlumciPage', () => {
  let component: OmiljeniGlumciPage;
  let fixture: ComponentFixture<OmiljeniGlumciPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OmiljeniGlumciPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OmiljeniGlumciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
