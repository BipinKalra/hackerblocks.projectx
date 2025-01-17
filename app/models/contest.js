import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  level_id: DS.attr(),
  start_time: DS.attr('date'),
  end_time: DS.attr('date'),
  duration: DS.attr(),
  show_quiz_grades: DS.attr(),
  created_by: DS.attr(),
  private_code: DS.attr(),
  passing_score: DS.attr(),
  image: DS.attr(),
  oldStatus: DS.attr(),
  status: DS.attr(),
  show_banner: DS.attr(),
  max_attempts: DS.attr(),
  locked_contest: DS.attr(),
  show_leaderboard: DS.attr(),
  show_tags: DS.attr(),
  moss: DS.attr(),
  acceptRegistrations: DS.attr(),
  allow_editorial_unlocks: DS.attr(),
  allow_testcase_unlocks: DS.attr(),
  plagiarismFiltering: DS.attr(),
  problemCount: DS.attr(),
  stats: DS.attr(),
  allowedLanguages: DS.attr(),
  dcb: DS.belongsTo('dcb'),
  problems: DS.hasMany('problems'),
  quizzes: DS.hasMany('quiz'),
  currentAttempt: DS.belongsTo('contest-attempt'),
  college_contest: DS.belongsTo('college_contest'),
  contest_type: DS.attr(),
  hasEnded: Ember.computed('end_time', function(){
    return moment(this.end_time).isBefore(moment())
  }),
  isYetToStart: Ember.computed('start_time', function(){
    return moment().isBefore(moment(this.start_time))
  }),
  contestTypeDisplay: Ember.computed('contest_type', function() {
    switch (this.contest_type) {
      case 'practice': return 'Practice Contest'
      case 'competition_contest': return 'Competition Contest'
      default: return 'Contest'
    }
  }),
  registeredUser: DS.attr(),
  registration: DS.belongsTo('contest-registration'),
  badgeIcon: DS.attr()
});
