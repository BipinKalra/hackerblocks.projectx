import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class IntermediateContestComponent extends Component {
  @service store
  @service currentUser

  showStartDialog = false

  @alias('contest.currentAttempt')
  contest_attempt

  @computed('contest.problems')
  get problemCount() {
    if (this.contest) {
      if (this.contest.stats) return this.contest.stats.problemcount
      return this.get('contest').hasMany('problems').ids().length
    }
  }

  @computed('showStartDialog')
  get queueTimeEnd() {
    if (this.showStartDialog) {
      return moment().add(Math.floor(Math.random() * 60), 'seconds')
    }
  }

  @computed('contest.quizzes')
  get quizCount() {
    if (this.contest) {
      return this.get('contest').hasMany('quizzes').ids().length
    }
  }

  @restartableTask createAttemptTask = function *() {
    const contest_attempt = this.store.createRecord('contest-attempt', {
      contest: this.contest
    })
    try {
      yield contest_attempt.save()
      this.contest.set('currentAttempt', contest_attempt)
      this.set('showStartDialog', false)
      if (this.onAfterCreate){
        this.onAfterCreate()
      }
    } catch (err) {
      contest_attempt.deleteRecord()
      throw err
    }
  }
}
